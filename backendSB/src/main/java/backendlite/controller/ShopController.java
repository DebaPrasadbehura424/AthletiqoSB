package backendlite.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import backendlite.director.ShopList;
import backendlite.model.Shop;
import backendlite.model.User;
import backendlite.service.ShopService;
import backendlite.service.UserService;

@RestController
@RequestMapping("/shops")
public class ShopController {
    @Autowired
    private ShopService shopService;

    @Autowired
    private UserService userService;

    @PostMapping("/shopadd/{userId}")
    public ResponseEntity<?> addShop(@PathVariable String userId, @RequestBody ShopList shoplist) {
        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
        Shop shopExit = user.getShop();
        if (shopExit == null) {
            return new ResponseEntity<>("Goal not found for the user", HttpStatus.BAD_REQUEST);
        }

        if (shopExit.getShopLists() == null) {
            shopExit.setShopLists(new ArrayList<>());
        }

        shopExit.getShopLists().add(shoplist);
        shopService.crateShop(shopExit);

        return new ResponseEntity<>(shopExit, HttpStatus.OK);
    }

    @GetMapping("/getAll/{userId}")
    public ResponseEntity<?> getAll(@PathVariable String userId) {
        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
        Shop shopExit = user.getShop();
        if (shopExit == null) {
            return new ResponseEntity<>("Goal not found for the user", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(shopExit.getShopLists(), HttpStatus.OK);
    }

    @DeleteMapping("/shopdel/{userId}/{id}")
    public ResponseEntity<?> deleteShop(@PathVariable String userId,
            @PathVariable long id) {
        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
        Shop shopExit = user.getShop();

        if (shopExit == null) {
            return new ResponseEntity<>("Goal not found for the user", HttpStatus.BAD_REQUEST);
        }
        if (shopExit.getShopLists() == null) {
            return new ResponseEntity<>("Goal is empty", HttpStatus.BAD_REQUEST);
        }
        ShopList shopListToRemove = null;
        for (ShopList shopList : shopExit.getShopLists()) {
            if (shopList.getId() == id) {
                shopListToRemove = shopList;
                break;
            }
        }

        if (shopListToRemove != null) {
            shopExit.getShopLists().remove(shopListToRemove);
            shopService.crateShop(shopExit);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>("ShopList with the provided id not found", HttpStatus.NOT_FOUND);
        }
    }

}
