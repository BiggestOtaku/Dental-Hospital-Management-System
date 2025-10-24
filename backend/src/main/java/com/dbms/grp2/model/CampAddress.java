package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "camp_addresses")
@IdClass(CampAddressId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CampAddress {

    @Id
    @Column(name = "camp_id", nullable = false)
    private Long campId;

    @Id
    @Column(name = "address_lane", nullable = false)
    private String addressLane;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "camp_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_campaddress_camp"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Camp camp;

}