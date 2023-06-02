package api20.api20.time;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimeRepo extends JpaRepository<Time, Long> {
    List<Time> findByCidade(String cidade);

    List<Time> findByNome(String nome);

    List<Time> findByEstado(String estado);

    List<Time> findByAnofundacao(Integer anoFundacao);


}

