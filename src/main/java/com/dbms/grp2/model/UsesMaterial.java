package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "uses_material")
@IdClass(UsesMaterialID.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UsesMaterial {

    @Id
    @Column(name = "implant_id", nullable = false)
    private Long implantId;

    @Id
    @Column(name = "material_id", nullable = false)
    private Long materialId;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "implant_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_usesmaterial_implant"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Implant implant;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_usesmaterial_rawmaterial"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private RawMaterial material;
}
