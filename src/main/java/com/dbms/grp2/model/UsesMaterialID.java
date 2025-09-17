package com.dbms.grp2.model;


import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Embeddable
@EqualsAndHashCode   // Important for PKs
public class UsesMaterialID implements Serializable {
    private Integer implantId;
    private Integer materialId;
}
