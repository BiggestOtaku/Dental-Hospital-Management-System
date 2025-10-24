package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "buying_raw_materials")
@IdClass(BuyingRawMaterialId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BuyingRawMaterial {


    @Id
    @Column(name = "material_id", nullable = false)
    private Long materialId;

    @Id
    @Column(name = "transaction_id", nullable = false)
    private Long transactionId;


    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_buying_raw_material"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private RawMaterial material;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_buying_transaction"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Transaction transaction;
}
