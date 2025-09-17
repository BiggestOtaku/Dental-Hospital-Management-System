package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="implant")
public class Implant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="implant_id")
    private Integer implantID;

    @Column(name="maximum_quantity")
    private Integer maximumQuantity;
    private Integer available;
    private Float price;
    private String type;
    private String size;

    @Column(name="expiry_period")
    private Integer expiryPeriod;   // e.g., in months or years
    // expiryPeriod used instead of warrantyPeriod in Relational Schema

    @Column(name="sterilization_date")
    private LocalDate sterilizationDate;
}
