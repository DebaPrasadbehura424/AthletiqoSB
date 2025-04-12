package backendlite.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class OauthController {

    @GetMapping("/oauth2")
    public Map<String, Object> getUserName(@AuthenticationPrincipal OAuth2User prinicipal) {
        return prinicipal.getAttributes();
    }

}
