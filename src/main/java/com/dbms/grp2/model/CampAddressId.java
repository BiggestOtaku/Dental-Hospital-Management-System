package com.dbms.grp2.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class CampAddressId implements Serializable {
    private Long campId;
    private String addressLane;
}