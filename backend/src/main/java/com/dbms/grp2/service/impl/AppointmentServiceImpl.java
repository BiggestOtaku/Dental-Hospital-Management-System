package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.AppointmentDetailDto;
import com.dbms.grp2.dto.AppointmentDetailDto;
import com.dbms.grp2.dto.AppointmentRequestDto;
import com.dbms.grp2.dto.UpdateAppointmentDto;
import com.dbms.grp2.model.Appointment;
import com.dbms.grp2.model.AppointmentRequest;
import com.dbms.grp2.model.Employee;
import com.dbms.grp2.model.Patient;
import com.dbms.grp2.repository.AppointmentRepository;
import com.dbms.grp2.repository.EmployeeRepository;
import com.dbms.grp2.repository.PatientRepository;
import com.dbms.grp2.service.AppointmentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public Appointment createNewAppointment(Appointment appointment, Long doctorId, Long patientId) {
        Employee doctor = employeeRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + doctorId));
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));

        if (appointment.getAppointmentId() != null) {
            throw new IllegalArgumentException("New appointment should not have an ID.");
        }

        appointment.setPatient(patient);
        appointment.setEmployee(doctor);

        return appointmentRepository.save(appointment);
    }

    @Override
    public Page<AppointmentDetailDto> getAllAppointments(Pageable pageable) {
        Page<Appointment> appointmentsPage = appointmentRepository.findAll(pageable);
        return appointmentsPage.map(this::convertToDto);
    }

    private AppointmentDetailDto convertToDto(Appointment appointment) {
        AppointmentDetailDto dto = modelMapper.map(appointment, AppointmentDetailDto.class);
        dto.setEmployeeEmailId(appointment.getEmployee().getEmailId());
        dto.setPatientEmailId(appointment.getPatient().getEmailId());
        if (appointment.getPatient() != null) {
            dto.setPatientId(appointment.getPatient().getPatientId());
        }
        if (appointment.getEmployee() != null) {
            dto.setEmployeeId(appointment.getEmployee().getEmployeeId());
        }

        return dto;
    }
    
    @Override
    public Optional<AppointmentDetailDto> updateAppointment(Long appointmentId, UpdateAppointmentDto updateDto) {

        Optional<Appointment> appointmentOptional = appointmentRepository.findById(appointmentId);

        if (appointmentOptional.isEmpty()) {
            return Optional.empty();
        }
        Appointment existingAppointment = appointmentOptional.get();

        if (updateDto.getStartTime() != null) {
            existingAppointment.setStartTime(updateDto.getStartTime());
        }
        if (updateDto.getEndTime() != null) {
            existingAppointment.setEndTime(updateDto.getEndTime());
        }
        if (updateDto.getDate() != null) {
            existingAppointment.setDate(updateDto.getDate());
        }
        if (updateDto.getAmount() != null) {
            existingAppointment.setAmount(updateDto.getAmount());
        }
        if (updateDto.getPaymentMode() != null) {
            existingAppointment.setPaymentMode(updateDto.getPaymentMode());
        }
        if (updateDto.getStatus() != null) {
            existingAppointment.setStatus(updateDto.getStatus());
        }
        if (updateDto.getReport() != null) {
            existingAppointment.setReport(updateDto.getReport());
        }
        Appointment updatedAppointment = appointmentRepository.save(existingAppointment);
        return Optional.of(convertToDto(updatedAppointment));
    }
    @Override
    public Optional<AppointmentDetailDto> getAppointmentById(Long appointmentId) {

        Optional<Appointment> appointmentOptional = appointmentRepository.findById(appointmentId);

        if (appointmentOptional.isEmpty()) {
            return Optional.empty();
        }

        Appointment appointment = appointmentOptional.get();
        AppointmentDetailDto dto = new AppointmentDetailDto();

        dto.setAppointmentId(appointment.getAppointmentId());
        dto.setStartTime(appointment.getStartTime());
        dto.setEndTime(appointment.getEndTime());
        dto.setDate(appointment.getDate());
        dto.setAmount(appointment.getAmount());
        dto.setPaymentMode(appointment.getPaymentMode());
        dto.setStatus(appointment.getStatus());
        dto.setReport(appointment.getReport());
        dto.setEmployeeEmailId(appointment.getEmployee().getEmailId());
        dto.setPatientEmailId(appointment.getPatient().getEmailId());

        if (appointment.getPatient() != null) {
            dto.setPatientId(appointment.getPatient().getPatientId());
            dto.setPatientEmailId(appointment.getPatient().getEmailId());
        }
        if (appointment.getEmployee() != null) {
            dto.setEmployeeId(appointment.getEmployee().getEmployeeId());
            dto.setEmployeeEmailId(appointment.getEmployee().getEmailId());
        }

        return Optional.of(dto);
    }

    @Override
    public Page<AppointmentDetailDto> getAppointmentsByPatientId(Long patientId, Pageable pageable) {
        Page<Appointment> appointments = appointmentRepository.findByPatientPatientId(patientId, pageable);

        return appointments.map(appointment -> {
            AppointmentDetailDto dto = modelMapper.map(appointment, AppointmentDetailDto.class);
            dto.setEmployeeEmailId(appointment.getEmployee().getEmailId());
            dto.setPatientEmailId(appointment.getPatient().getEmailId());
            return dto;
        });
    }

    @Override
    public void requestAppointment(AppointmentRequestDto appointmentRequestDto) {
        Patient patient = patientRepository.findById(appointmentRequestDto.getPatientId()).orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        Employee doctor = employeeRepository.findById(appointmentRequestDto.getDoctorId()).orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        if(!Objects.equals(doctor.getHumanResource().getHrType(), "doctor"))
            throw new IllegalArgumentException("Employee is not a Doctor");

//        AppointmentRequest appointmentRequest = AppointmentRequest.builder()
//                .
    }
}