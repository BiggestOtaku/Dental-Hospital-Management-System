package com.dbms.grp2.model;

import java.io.Serializable;
import java.util.Objects;

public class CampAttendeeId implements Serializable {
    private Long campId;
    private Long patientId;

    // Default constructor, getters, setters, equals(), and hashCode() are required

    public CampAttendeeId() {
    }

    public CampAttendeeId(Long campId, Long patientId) {
        this.campId = campId;
        this.patientId = patientId;
    }

    // Getters and setters...

    public Long getCampId() {
        return campId;
    }

    public void setCampId(Long campId) {
        this.campId = campId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CampAttendeeId that = (CampAttendeeId) o;
        return Objects.equals(campId, that.campId) && Objects.equals(patientId, that.patientId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(campId, patientId);
    }
}