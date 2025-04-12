package backendlite.director;

import lombok.Data;

@Data
public class ShopList {
    private long id;
    private String name;
    private String description;
    private String amount;
    private String imgUrl;
    private String category;
}
