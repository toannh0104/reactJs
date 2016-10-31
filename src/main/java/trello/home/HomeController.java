package trello.home;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.time.LocalDateTime;

import static org.springframework.http.HttpStatus.OK;

@Controller
class HomeController {

    @RequestMapping("/")
    String index(Model model) {
        model.addAttribute("now", LocalDateTime.now());
        return "index";
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    ResponseEntity<String> save(@RequestBody String data,
                                @RequestParam(value = "fileName") String fileName,
                                HttpServletRequest request) {

        String path = request.getServletContext().getRealPath("WEB-INF/classes/static");
        File file = new File(path+"/"+fileName);
        try {
            PrintWriter writer = new PrintWriter(file, "UTF-8");
            writer.println(URLDecoder.decode(data.substring(data.indexOf("&")+1, data.length())));
            writer.close();
        } catch (IOException ioe) {
            System.out.println("Failed to store file " + file.getName());
        }
        return new ResponseEntity<String>("OK", OK);
    }

    @RequestMapping("properties")
    @ResponseBody
    java.util.Properties properties() {
        return System.getProperties();
    }
}
