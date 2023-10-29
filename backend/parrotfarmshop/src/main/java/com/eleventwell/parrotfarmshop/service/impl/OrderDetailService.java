package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.OrderDetailDTO;
import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import com.eleventwell.parrotfarmshop.repository.*;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderDetailService implements IGenericService<OrderDetailDTO> {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private GenericConverter converter;

    @Autowired
    private ParrotRepository parrotRepository;


    @Autowired
    private NestRepository parrotEggNestRepository;

    @Autowired
    private NestUsageHistoryRepository nestUsageHistoryRepository;


    @Override
    public List<OrderDetailDTO> findAll() {
        return null;
    }

    @Override
    public OrderDetailDTO save(OrderDetailDTO orderDetailDTO) {
        OrderDetailEntity orderDetailEntity = new OrderDetailEntity();
        orderDetailEntity = (OrderDetailEntity) converter.toEntity(orderDetailDTO, OrderDetailEntity.class);

        orderDetailEntity.setNestUsageHistory(nestUsageHistoryRepository.findOneById(orderDetailDTO.getNestUsageId()));
        orderDetailRepository.save(orderDetailEntity);
        return (OrderDetailDTO) converter.toDTO(orderDetailEntity, OrderDetailDTO.class);
    }

    public void createOrderDetailDTO(Long orderId, Long productID, int check) {
        OrderDetailEntity orderDetailEntity = new OrderDetailEntity();

        OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
        orderDetailDTO.setOrderId(orderId);
        if (check == 1) {
            orderDetailDTO.setParrotId(productID);
        } else if (check == 2) {
            orderDetailDTO.setNestUsageId(productID);
        }

        save(orderDetailDTO);
    }

    public List<OrderDetailDTO> findAllByOrderId(Long id) {

        List<OrderDetailDTO> result = new ArrayList<>();
        List<OrderDetailEntity> orderDetailEntities = orderDetailRepository.findAllByOrderIdId(id);

        for (OrderDetailEntity entity : orderDetailEntities) {
            OrderDetailDTO orderDetailDTO = (OrderDetailDTO) converter.toDTO(entity, OrderDetailDTO.class);
            result.add(orderDetailDTO);
        }

        return result;

    }


    public List<OrderDetailHistoryModel> createOrderDetailHistoryModelList(Long id) {
        List<OrderDetailEntity> listEntity = orderDetailRepository.findAllByOrderIdId(id);
        List<OrderDetailHistoryModel> listModel = new ArrayList<>();
        int count = 0;

            for (OrderDetailEntity entity : listEntity) {
                for (OrderDetailHistoryModel models : listModel) {
                    if (models.getColor().equals(entity.getParrot().getParrotSpeciesColor().getColor()) && models.getSpeciesName().equals(entity.getParrot().getParrotSpeciesColor().getParrotSpecies().getName())) {
                        models.setQuantity(models.getQuantity() + 1);
                        models.setTotalPrice(
                                models.getTotalPrice() + entity.getParrot().getParrotSpeciesColor().getPrice());
                        count = 1;
                        break;
                    }

                }
                if (count == 0) {
                    OrderDetailHistoryModel model = new OrderDetailHistoryModel();
                    if(entity.getParrot()!=null){
                        model.setImg(entity.getParrot().getParrotSpeciesColor().getImages().get(0).getImageUrl());
                        model.setColor(entity.getParrot().getParrotSpeciesColor().getColor());
                        model.setColorId(entity.getParrot().getParrotSpeciesColor().getId());
                        model.setSpeciesName(entity.getParrot().getParrotSpeciesColor().getParrotSpecies().getName());
                        model.setTotalPrice(entity.getParrot().getParrotSpeciesColor().getPrice());
                        model.setPrice(entity.getParrot().getParrotSpeciesColor().getPrice());
                        model.setQuantity(1);
                    }else{
                        model.setImg(entity.getNestUsageHistory().getNest().getNestPrice().getParrotSpecies().getParrotSpeciesColors().get(0).getImages().get(0).getImageUrl());
                        model.setSpeciesName(entity.getNestUsageHistory().getNest().getNestPrice().getParrotSpecies().getName());
                        model.setTotalPrice(entity.getNestUsageHistory().getNest().getNestPrice().getPrice());
                        model.setPrice(entity.getNestUsageHistory().getNest().getNestPrice().getPrice());
                        model.setQuantity(1);
                    }

                    listModel.add(model);
                }
                count = 0;



        }

        return listModel;
    }

    @Override
    public void changeStatus(Long ids) {
    }

    @Override
    public List<OrderDetailDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<OrderDetailDTO> results = new ArrayList();
        List<OrderDetailEntity> entities = orderDetailRepository.findAll(pageable).getContent();

        for(OrderDetailEntity item : entities) {
            OrderDetailDTO newDTO = (OrderDetailDTO) converter.toDTO(item,OrderDetailDTO.class);
            results.add(newDTO);

        }

        return results;
    }

    public void removeOrderDetail(Long id){

        orderDetailRepository.deleteById(id);
    }
    @Override
    public int totalItem() {
        return (int)orderDetailRepository.count();
    }
}
