package api20.api20.empregado;

import jakarta.persistence.*;
import lombok.*;

    @Table(name = "empregados")
    @Entity(name = "Empregado")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode(of = "id")
    public class Empregado {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String nome;
        private Float salario;
        private String cargo;


        public Empregado(EmpregadoRequestDTO data) {
            this.nome = data.nome();
            this.salario = data.salario();
            this.cargo = data.cargo();
        }

    }


