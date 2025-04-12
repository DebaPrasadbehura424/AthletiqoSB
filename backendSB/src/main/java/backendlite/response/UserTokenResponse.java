package backendlite.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import backendlite.model.User;
import lombok.Data;

@Data
@JsonInclude(value = Include.NON_NULL)
public class UserTokenResponse {
    private User user;
    private String token;
    private String userId;

    public UserTokenResponse(User user, String userId) {
        this.user = user;
        this.userId = userId;
    }

    public UserTokenResponse(User user, String token, String userId) {
        this.user = user;
        this.token = token;
        this.userId = userId;
    }
}
