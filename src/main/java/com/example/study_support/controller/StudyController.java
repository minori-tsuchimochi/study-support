package com.example.study_support.controller;

import com.example.study_support.entity.StudyRecord;
import com.example.study_support.service.StudyService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class StudyController {

  private final StudyService service;

  public StudyController(StudyService service) {
    this.service = service;
  }
  
  @GetMapping("/")
  public String home(Model model) {
    List<StudyRecord> records = service.getRecords(1L);
    model.addAttribute("records", records);
    return "home";
  }

  @PostMapping("/start")
  @ResponseBody
  public StudyRecord start() {
    return service.startStudy(1L);
  }
  
  @PostMapping("/end/{id}")
  @ResponseBody
  public StudyRecord end(@PathVariable Long id) {
    return service.endStudy(id);
  }
}
