<<<<<<< HEAD
package com.webapp.ecommerce.controller;

import com.webapp.ecommerce.model.Product;
import com.webapp.ecommerce.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // Fetch all products or filter based on search query
    @GetMapping
    public List<Product> getAllProducts(@RequestParam(value = "search", required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return service.searchProducts(search);
        } else {
            return service.getAllProducts();
        }
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return service.getProductById(id);
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        return service.updateProduct(id, updatedProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
    }
}
=======
package com.webapp.ecommerce.controller;

import com.webapp.ecommerce.model.Product;
import com.webapp.ecommerce.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

>>>>>>> bdc04235f00b2f6b99d6b53985389f642b7ab66b
