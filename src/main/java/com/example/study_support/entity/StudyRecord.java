package com.example.study_support.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class StudyRecord {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long userId;

  private LocalDateTime startTime;
  private LocalDateTime endTime;

  private Long duration;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public Long getUserId() { return userId; }
  public void setUserId(Long userId) { this.userId = userId; }

  public LocalDateTime getStartTime() { return startTime; }
  public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

  public LocalDateTime getEndTime() { return endTime; }
  public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
  
  public Long getDuration() { return duration; }
  public void setDuration(Long duration) { this.duration = duration; }
}
