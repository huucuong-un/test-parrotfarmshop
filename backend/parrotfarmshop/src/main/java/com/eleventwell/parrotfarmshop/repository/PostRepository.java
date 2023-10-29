package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.FeedbackEntity;
import com.eleventwell.parrotfarmshop.entity.PostEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

    PostEntity findOneById(long id);

    List<PostEntity> findAllByOrderByIdDesc();

    @Query("SELECT u FROM PostEntity u WHERE (:title IS NULL OR u.title LIKE CONCAT('%', :title, '%')) " +
            "AND (:content is Null or u.content LIKE CONCAT('%', :content, '%'))" +
            "AND (:description is Null or u.description LIKE CONCAT('%', :description, '%'))" +
            "AND (:searchDate is Null or DATE(u.createdDate) = :searchDate or DATE(u.startDate) = :searchDate or DATE(u.endDate) = :searchDate)" +
            "AND (:status is Null or u.status = :status) " +
                "ORDER BY " +
                "case when :sortTitle = 'TDESC' then u.title end desc, " +
                "case when :sortTitle = 'TASC' then u.title end asc, " +
                "case when :sortDate = 'DDESC' then u.id end desc, " +
                "case when :sortDate = 'DASC' then u.id end asc, " +
                "u.id desc")
    List<PostEntity> searchSortForAdmin(@Param("title") String title,
                                        @Param("content") String content,
                                        @Param("description") String description,
                                        @Param("searchDate") Date searchDate,
                                        @Param("status") Boolean status,
                                        @Param("sortTitle") String sortTitle,
                                        @Param("sortDate") String sortDate,
                                        Pageable pageable);
}


//    @Query("SELECT u FROM FeedbackEntity u WHERE (:rating IS NULL OR u.rating = :rating)
//    AND (:speciesId IS NULL OR u.parrotSpeciesColor.parrotSpecies.id = :speciesId)
//    AND (:searchDate IS NULL OR DATE(u.createdDate) = :searchDate)
//    AND (:username IS NULL OR u.user.userName LIKE CONCAT('%', :username, '%'))
//    AND (:status IS NULL OR u.status = :status) " +
//            "ORDER BY " +
//            "CASE WHEN :sortRating = 'RDESC' THEN u.rating END DESC, " +
//            "CASE WHEN :sortRating = 'RASC' THEN u.rating END ASC, " +
//            "CASE WHEN :sortDate = 'DDESC' THEN u.id END DESC, " +
//            "CASE WHEN :sortDate = 'DASC' THEN u.id END ASC, " +
//            "u.id DESC")
//    List<FeedbackEntity> searchSortForAdmin(@Param("rating") Integer rating, @Param("speciesId") Long speciesId, @Param("searchDate") Date searchDate, @Param("username") String username, @Param("status") Boolean status, @Param("sortRating") String sortRating, @Param("sortDate") String sortDate, Pageable pageable);

//    @NotBlank
//    @Column(name = "title")
//    private String title;
//
//    @NotBlank
//
//    @Column(name = "content")
//    private String content;
//
//    @NotBlank
//    @Column(name = "description")
//    private String description;
//
//    @NotBlank
//    @Lob
//    @Column(name = "image_url")
//    private String imageUrl;
//
//    @Column(name = "start_date")
//    private String startDate;
//
//    @Column(name = "end_date")
//    private String endDate;
//
//    @Column(name = "status")
//    private Boolean status;