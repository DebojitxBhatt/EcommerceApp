<<<<<<< HEAD
package com.webapp.ecommerce.repository;
import java.util.List;
import com.webapp.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
}
=======
package com.webapp.ecommerce.repository;
import java.util.List;
import com.webapp.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

>>>>>>> bdc04235f00b2f6b99d6b53985389f642b7ab66b
