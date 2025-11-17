package com.example.study_support.service;

import com.example.study_support.entity.StudyRecord;
import com.example.study_support.repository.StudyRecordRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudyService {

  private final StudyRecordRepository repository;

  public StudyService(StudyRecordRepository repository) {
    this.repository =repository;
  }

  public StudyRecord startStudy(Long userId) {
    StudyRecord record = new StudyRecord();
    record.setUserId(userId);
    record.setStartTime(LocalDateTime.now());
    return repository.save(record);
  }
  
  public StudyRecord endStudy(Long recordId) {
    StudyRecord record = repository.findById(recordId).orElseThrow();
    record.setEndTime(LocalDateTime.now());
    record.setDuration(Duration.between(record.getStartTime(), record.getEndTime()).getSeconds());
    return repository.save(record);
  }

  public List<StudyRecord> getRecords(Long userId) {
    return repository.findByUserId(userId);
  }
}
