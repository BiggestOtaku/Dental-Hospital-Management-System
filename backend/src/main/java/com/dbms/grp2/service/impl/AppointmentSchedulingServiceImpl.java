package com.dbms.grp2.service.impl;

import com.dbms.grp2.model.Appointment;
import com.dbms.grp2.model.AppointmentRequest;
import com.dbms.grp2.model.AppointmentStatus;
import com.dbms.grp2.model.Employee;
import com.dbms.grp2.repository.AppointmentRepository;
import com.dbms.grp2.repository.AppointmentRequestRepository;
import com.dbms.grp2.repository.EmployeeRepository;
import com.dbms.grp2.service.AppointmentSchedulingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AppointmentSchedulingServiceImpl implements AppointmentSchedulingService {

    private static final Logger log = LoggerFactory.getLogger(AppointmentSchedulingServiceImpl.class);
    private static final LocalTime CLINIC_START_TIME = LocalTime.of(9, 0);
    private static final int APPOINTMENT_DURATION_MINUTES = 20;

    private final AppointmentRequestRepository requestRepository;
    private final AppointmentRepository appointmentRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public void scheduleAppointmentsForDate(LocalDate date) {
        log.info("Starting manual appointment scheduling process for date: {}", date);
        List<AppointmentRequest> requests = requestRepository.findByRequestDateOrderByCreatedAtAsc(date);
        if (requests.isEmpty()) {
            log.warn("No appointment requests found for {}. No action taken.", date);
            cleanupOldRequests();
            return;
        }
        List<Employee> allDoctors = employeeRepository.findByHumanResourceHrType("doctor");
        if (allDoctors.isEmpty()) {
            log.error("CRITICAL: No employees with type 'doctor' found. Cannot schedule appointments.");
            return;
        }

        int totalRequests = requests.size();
        int totalDoctors = allDoctors.size();
        int minPerDoctor = totalRequests / totalDoctors;
        int extraAppointments = totalRequests % totalDoctors;

        log.info("Found {} requests for {} doctors. Min per doctor: {}, Extra appointments to assign: {}",
                totalRequests, totalDoctors, minPerDoctor, extraAppointments);


        Map<Long, Integer> doctorLoad = new HashMap<>();
        Map<Long, LocalTime> doctorNextSlot = new HashMap<>();
        for (Employee doctor : allDoctors) {
            doctorLoad.put(doctor.getEmployeeId(), 0);
            doctorNextSlot.put(doctor.getEmployeeId(), CLINIC_START_TIME);
        }

        List<AppointmentRequest> unassignedRequests = new ArrayList<>();

        for (AppointmentRequest request : requests) {
            Long doctorId = request.getRequestedDoctor().getEmployeeId();
            int currentLoad = doctorLoad.get(doctorId);

            if (currentLoad < minPerDoctor) {
                createAppointment(request, doctorNextSlot);
                doctorLoad.put(doctorId, currentLoad + 1);
            } else if (currentLoad == minPerDoctor && extraAppointments > 0) {
                createAppointment(request, doctorNextSlot);
                doctorLoad.put(doctorId, currentLoad + 1);
                extraAppointments--;
            } else {
                unassignedRequests.add(request);
            }
        }


        if (!unassignedRequests.isEmpty()) {
            log.info("Entering second pass to assign {} overflow requests.", unassignedRequests.size());
            int doctorIndex = 0;

            for (AppointmentRequest request : unassignedRequests) {
                while (true) {
                    Employee currentDoctor = allDoctors.get(doctorIndex);
                    Long currentDoctorId = currentDoctor.getEmployeeId();
                    int currentLoad = doctorLoad.get(currentDoctorId);

                    if (currentLoad < minPerDoctor) {
                        assignToDoctorAndMove(request, currentDoctor, date, doctorNextSlot, doctorLoad);
                        break;
                    } else if (currentLoad == minPerDoctor && extraAppointments > 0) {
                        assignToDoctorAndMove(request, currentDoctor, date, doctorNextSlot, doctorLoad);
                        extraAppointments--;
                        doctorIndex = (doctorIndex + 1) % totalDoctors;
                        break;
                    }
                    doctorIndex = (doctorIndex + 1) % totalDoctors;
                }
            }
        }

        log.info("Scheduling process completed for {}. Final doctor load: {}", date, doctorLoad);
        cleanupOldRequests();
    }

    private void assignToDoctorAndMove(
            AppointmentRequest request,
            Employee doctor,
            LocalDate date,
            Map<Long, LocalTime> doctorNextSlot,
            Map<Long, Integer> doctorLoad
    ) {
        AppointmentRequest reassignedRequest = new AppointmentRequest(request.getPatient(), doctor, date);
        createAppointment(reassignedRequest, doctorNextSlot);
        doctorLoad.put(doctor.getEmployeeId(), doctorLoad.get(doctor.getEmployeeId()) + 1);
    }

    private void createAppointment(AppointmentRequest request, Map<Long, LocalTime> doctorNextSlot) {
        Long doctorId = request.getRequestedDoctor().getEmployeeId();
        LocalTime startTime = doctorNextSlot.get(doctorId);

        Appointment appointment = Appointment.builder()
                .patient(request.getPatient())
                .employee(request.getRequestedDoctor())
                .date(request.getRequestDate().plusDays(1))
                .startTime(startTime)
                .endTime(startTime.plusMinutes(APPOINTMENT_DURATION_MINUTES))
                .status(AppointmentStatus.PENDING)
                .build();

        appointmentRepository.save(appointment);

        doctorNextSlot.put(doctorId, startTime.plusMinutes(APPOINTMENT_DURATION_MINUTES));
    }

    @Transactional
    public void cleanupOldRequests() {
        LocalDate today = LocalDate.now();
        requestRepository.deleteByRequestDateBefore(today);
        log.info("Cleaned up appointment requests for all dates before {}", today);
    }
}

