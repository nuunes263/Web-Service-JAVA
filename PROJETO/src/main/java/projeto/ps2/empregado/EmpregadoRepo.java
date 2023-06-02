package api20.api20.empregado;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface EmpregadoRepo extends JpaRepository<Empregado, Long> {

    List<Empregado> findByNome(String nome);

    List<Empregado> findByCargo(String cargo);

    List<Empregado> findBySalario(Integer salario);

}
