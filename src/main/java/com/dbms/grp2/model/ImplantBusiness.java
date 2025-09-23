package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "implant_business")
@IdClass(ImplantBusinessId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ImplantBusiness {

    // ✅ PK fields as basic types
    @Id
    @Column(name = "implant_id", nullable = false)
    private Long implantId;

    @Id
    @Column(name = "transaction_id", nullable = false)
    private Long transactionId;

    // ✅ Many-to-One associations
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "implant_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_implantbusiness_implant"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Implant implant;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_implantbusiness_transaction"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Transaction transaction;

    private Long quantity;

    private String soldBy;    // can be Employee reference later if needed
    private String broughtBy; // can be Patient reference later if needed
}
