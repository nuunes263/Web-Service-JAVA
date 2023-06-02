package api20.api20.time;

import javax.print.DocFlavor;

public record TimeResponseDTO(Long id, String nome, Integer anofundacao, String cidade, String estado) {
    public TimeResponseDTO(Time time){
        this(time.getId(), time.getNome(), time.getAnofundacao(), time.getCidade(), time.getEstado());
    }
}
