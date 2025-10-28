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

    @Id
    @Column(name = "implant_id", nullable = false)
    private Long implantId;

    @Id
    @Column(name = "transaction_id", nullable = false)
    private Long transactionId;

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

    private String soldBy;
    private String broughtBy;
}
