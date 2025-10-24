package com.dbms.grp2.service;

import java.time.LocalDate;

public interface AppointmentSchedulingService {

    void scheduleAppointmentsForDate(LocalDate date);
}