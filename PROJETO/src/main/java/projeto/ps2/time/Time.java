package api20.api20.time;

import jakarta.persistence.*;
import lombok.*;


@Table(name = "times")
@Entity(name = "Time")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Time {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Integer anofundacao;
    private String cidade;
    private String estado;


    public Time(TimeRequestDTO data) {
        this.nome = data.nome();
        this.anofundacao = data.anofundacao();
        this.cidade = data.cidade();
        this.estado = data.estado();
    }

}
