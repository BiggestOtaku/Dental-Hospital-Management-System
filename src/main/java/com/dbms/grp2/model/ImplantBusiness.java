package com.dbms.grp2.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "implant_business")
@IdClass(ImplantBusinessId.class) // Specifies the composite key class
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ImplantBusiness {

    @Id
    @Column(name = "implant_id")
    private Long implantId;

    @Id
    @Column(name = "transaction_id")
    private Long transactionId;

    private int quantity;

    private String soldBy; // Assuming this is a String, like an employee name or ID

    private String broughtBy; // Assuming this is a String, like a patient name or ID
}