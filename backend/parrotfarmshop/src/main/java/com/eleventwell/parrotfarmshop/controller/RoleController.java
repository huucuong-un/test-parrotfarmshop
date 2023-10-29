package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.RoleDTO;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/role")
public class RoleController {
    @Autowired
    private IGenericService roleService;

    @Autowired
    RoleService roleServiceConcrete;

    @GetMapping
    public List<RoleDTO> showRoles() {
      List<RoleDTO> list = roleService.findAll();
        return list;
    }

    @PostMapping
    public RoleDTO createRole(@RequestBody RoleDTO model) {
        return (RoleDTO) roleService.save(model);
    }

    //accept editing description and status only
    @PutMapping(value = "{id}")
    public RoleDTO updateRole(@RequestBody RoleDTO model, @PathVariable("id") Long id) {
        model.setId(id);
        return (RoleDTO) roleService.save(model);
    }

    @DeleteMapping(value = "{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id){
        roleService.changeStatus(id);
    }

    @PostMapping(value = "{id}")
    public void findRoleById(@PathVariable("id") Long id) { roleServiceConcrete.findOneById(id);}
}
