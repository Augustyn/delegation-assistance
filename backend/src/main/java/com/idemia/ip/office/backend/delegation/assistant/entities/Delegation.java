package com.idemia.ip.office.backend.delegation.assistant.entities;

import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import lombok.*;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "delegation")
public class Delegation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "destination_country_iso", nullable = false, length = 3)
    private String destinationCountryISO3;

    @Column(name = "destination_location", nullable = false)
    private String destinationLocation;

    @Column(name = "objective", nullable = false)
    private String delegationObjective;

    @Column(name = "status", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private DelegationStatus delegationStatus;

    @JoinColumn(name = "delegated_employee", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private User delegatedEmployee;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Delegation that = (Delegation) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .toHashCode();
    }
}