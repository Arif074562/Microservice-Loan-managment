package com.cts.notification.service.impl;

import com.cts.notification.dto.NotificationRequestDTO;
import com.cts.notification.dto.NotificationResponseDTO;
import com.cts.notification.entity.Notification;
import com.cts.notification.enums.NotificationStatus;
import com.cts.notification.exception.ResourceNotFoundException;
import com.cts.notification.mapper.NotificationMapper;
import com.cts.notification.repository.NotificationRepository;
import com.cts.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repository;
    private final NotificationMapper mapper;

    @Override
    public NotificationResponseDTO create(NotificationRequestDTO request) {
        log.info("Creating notification for user: {}", request.getUserId());
        Notification entity = mapper.toEntity(request);
        entity.setStatus(NotificationStatus.UNREAD);
        entity = repository.save(entity);
        log.info("Notification created: {}", entity.getNotificationId());
        return mapper.toResponseDTO(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NotificationResponseDTO> getByUserId(Long userId, Pageable pageable) {
        log.info("Fetching notifications for user: {}", userId);
        return repository.findByUserId(userId, pageable).map(mapper::toResponseDTO);
    }

    @Override
    public NotificationResponseDTO markAsRead(Long id) {
        log.info("Marking notification as read: {}", id);
        Notification entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));
        entity.setStatus(NotificationStatus.READ);
        entity = repository.save(entity);
        return mapper.toResponseDTO(entity);
    }

    @Override
    public void markAllAsReadForUser(Long userId) {
        log.info("Marking all notifications as read for user: {}", userId);
        repository.markAllAsReadForUser(userId, NotificationStatus.READ);
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting notification: {}", id);
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Notification not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
