package com.dbms.grp2;

import com.dbms.grp2.model.Appointment;
import com.dbms.grp2.model.AppointmentStatus;
import com.dbms.grp2.service.AppointmentService;
import com.dbms.grp2.service.PatientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@SpringBootTest
public class AppointmentTests {

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private PatientService patientService;

    @Test
    public void testCreateAppointment() {
        Appointment appointment = Appointment.builder()
                .startTime(LocalTime.of(10, 0))
                .endTime(LocalTime.of(20, 0))
                .date(LocalDate.now())
                .amount(BigDecimal.valueOf(500))
                .status(AppointmentStatus.CONFIRMED)
                .paymentMode("CASH")
                .build();

        System.out.println(appointmentService.createNewAppointment(appointment, 1L, 1L));
        patientService.deletePatientById(1L);
    }
}