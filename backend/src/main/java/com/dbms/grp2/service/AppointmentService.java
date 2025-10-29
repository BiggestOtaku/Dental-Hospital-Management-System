package com.dbms.grp2.service;

import com.dbms.grp2.dto.AppointmentDetailDto;
import com.dbms.grp2.dto.AppointmentDto;
import com.dbms.grp2.dto.AppointmentRequestDto;
import com.dbms.grp2.dto.UpdateAppointmentDto;
import com.dbms.grp2.model.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AppointmentService {
    Appointment createNewAppointment(Appointment appointment, Long doctorId, Long patientId);
    Page<AppointmentDto> getAllAppointments(Pageable pageable);
    Optional<AppointmentDto> updateAppointment(Long appointmentId, UpdateAppointmentDto updateDto);
    Optional<AppointmentDetailDto> getAppointmentById(Long appointmentId);
    Page<AppointmentDetailDto> getAppointmentsByPatientId(Long patientId, Pageable pageable);
    void requestAppointment(AppointmentRequestDto appointmentRequestDto);
}
