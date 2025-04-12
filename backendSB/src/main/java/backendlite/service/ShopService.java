package backendlite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backendlite.model.Shop;
import backendlite.repository.ShopRepo;

@Service
public class ShopService {
    @Autowired
    private ShopRepo shopRepo;

    public Shop crateShop(Shop shop) {
        return shopRepo.save(shop);
    }

}
