package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.FeedbackDTO;
import com.eleventwell.parrotfarmshop.dto.OrderDetailDTO;
import com.eleventwell.parrotfarmshop.repository.FeedbackRepository;
import com.eleventwell.parrotfarmshop.service.impl.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/feedback")
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @GetMapping(value = "")
    public List<FeedbackDTO> showAllFeedback() {
        return feedbackService.findAll();

    }

    @GetMapping(value = "calculate-average-rating-by-species-id")
    public Double calculateAverageRating(@RequestBody @RequestParam(value = "speciesId") Long  speciesId) {
        return feedbackService.calculateAverageFeedbackRatingBySpeciesId(speciesId);

    }

    @GetMapping(value = "count-by-rating")
    public Integer countByRating(@RequestBody @RequestParam(value = "rating") Integer  rating) {
        return feedbackService.countByRating(rating);

    }


    @GetMapping(value = "count-by-species-id")
    public Integer countBySpeciesId(@RequestBody @RequestParam(value = "id") Long  id) {

        return feedbackService.countBySpeciesId(id);



    }

    @GetMapping(value = "count-by-species-id-or-species-color-id-and-rating")
    public Integer countBySpeciesIdSpeciesColorIdAndRating(@RequestBody  @RequestParam(value = "speciesId",required = false) Long  speciesId, @RequestParam(value = "colorId",required = false) Long  colorId,@RequestParam(value = "rating",required = false) Integer  rating) {

        return feedbackService.countBySpeciesIdOrSpeciesColorIdAndRating(speciesId,colorId, rating);



    }
    @GetMapping(value = "count-by-orderId")
    public Integer countByOrderId(@RequestBody @RequestParam(value = "orderId") Long  orderId) {

        return feedbackService.countByOrderId(orderId);


    }
    @GetMapping(value = "find-all-by-species-id-and-belong-to-or-rating-or-color-id")
    public PagingModel findAllBySpeciesIdAndBelongTo(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit, @RequestParam("speciesId") Long speciesId, @RequestParam(value = "productType",required = false) String productType,@RequestParam(value = "rating",required = false) Integer rating, @RequestParam(value = "colorId",required = false) Long colorId) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        result.setListResult(feedbackService.findAllBySpeciesIdAndBelongtoOrRatingOrColorId(speciesId, productType, rating,colorId,pageable));
        result.setTotalPage(((int) Math.ceil((double) (feedbackService.totalItem()) / limit)));
        result.setLimit(limit);



        return result;
    }
    @GetMapping(value = "admin/search_sort")
    public PagingModel adminSearchSort(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit,@RequestParam(value = "rating",required = false) Integer rating, @RequestParam(value = "speciesId",required = false) Long speciesId, @RequestParam(value = "date", required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, @RequestParam(value = "username",required = false) String username,@RequestParam(value = "status",required = false) Boolean status ,@RequestParam(value = "sortRating",required = false) String sortRating, @RequestParam(value = "sortDate",required = false)String sortDate) {

        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        result.setListResult(feedbackService.searchSortForAdmin(rating,speciesId,date , username,status,sortRating,sortDate ,pageable));
        result.setTotalPage(((int) Math.ceil((double) (feedbackService.totalItem()) / limit)));
        result.setLimit(limit);



        return result;
    }


    @PostMapping(value = "")
    public FeedbackDTO createFeedback(@RequestBody FeedbackDTO dto) {

        return feedbackService.save(dto);
    }
    
        @PutMapping(value = "admin/change-status/{id}")
    public void createFeedback(@RequestBody @PathVariable("id") Long id ) {

       feedbackService.changeStatus(id);
    }
    


}