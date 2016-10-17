package ex.demo.controller;

import ex.demo.entity.Photo;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * Created by Toan_H on 10/14/2016.
 */

@Controller
public class PostController {

    @MessageMapping("/photo")
    @SendTo("/topic/posts")
    public Photo getPhoto(Photo photo) throws Exception {
        Thread.sleep(1000);
        return photo;
    }
}
