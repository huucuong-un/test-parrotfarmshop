package com.eleventwell.parrotfarmshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;


import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


//*UserID
//UserName
//Password
//Email
//CreatedAt
//Status
@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

//userName is user account name
//fullName is name of user
@Entity
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "user_name"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})
public class UserEntity extends BaseEntity implements UserDetails {
    @NotBlank
    @Size(min = 3, max = 20)
    @Column(name = "user_name")
    private String userName;

    @NotBlank
    @JsonIgnore
    @Column
    private String password;

    @NotBlank
    @Email
    @Column(name = "email")
    private String email;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column(name = "full_name")
    private String fullName;

    @Column(name = "img_url")
    private String imgUrl;

    @Column
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;

    @Column
    private Boolean gender;

    @Column
    private String dob;


 //====================================================================================
    @OneToMany(mappedBy = "user")
    private List<OrderEntity> order = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<FeedbackEntity> feedbacks = new ArrayList<>();

    @OneToMany(mappedBy = "replyer")
    private List<FeedbackEntity> feedbackRs = new ArrayList<>();


    @OneToMany(mappedBy = "user")
    private List<DeliveryInformationEntity> deliveryInformations = new ArrayList<>();


    @OneToMany(mappedBy = "owner")
    private List<ParrotEntity> parrots = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Assuming that the role is stored as a role name (e.g., "ROLE_USER")
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.getName())); // Modify as per your role structure
        // Add more authorities if needed

        return authorities;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

//======================================================================================




    //	@OneToMany(mappedBy = "user")
//	private List<ParrotEntity> parrots = new ArrayList<>();

//
//	@OneToMany(mappedBy = "User")
//	private List<ParrotSpeciesEntity> parrotSpecies = new ArrayList<>();
//
//	@OneToMany(mappedBy = "User")
//	private List<ParrotSpeciesDetailEntity> parrotSpeciesDetail = new ArrayList<>();
//
//	@OneToMany(mappedBy = "User")
//	private List<ColorEntity> color = new ArrayList<>();

//	@OneToMany(mappedBy = "User")
//	private List<ParrotEggNestEntity> parrotEggNest = new ArrayList<>();
//

//
//
}
