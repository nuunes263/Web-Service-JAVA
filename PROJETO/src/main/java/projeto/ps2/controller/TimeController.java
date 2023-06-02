package api20.api20.controller;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import api20.api20.time.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/times")
public class TimeController {

    @Autowired
    private TimeRepo repository;

    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public void saveTime(@RequestBody TimeRequestDTO data){
        repository.save(new Time(data));
    }

    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<TimeResponseDTO> getAll(){
        return repository.findAll().stream().map(TimeResponseDTO::new).toList();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Optional<Time> getById(@PathVariable Long id) {
        return repository.findById(id);
    }
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public void deleteById(@PathVariable Long id){
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Optional<Time> putById(@PathVariable Long id, @RequestBody TimeRequestDTO data) {
        Optional<Time> optionalTime = repository.findById(id);
        if (optionalTime.isPresent()) {
            Time time = optionalTime.get();
            if (data.nome() != null) {
                time.setNome(data.nome());
            }
            if (data.estado() != null) {
                time.setEstado(data.estado());
            }
            if (data.cidade() != null) {
                time.setCidade(data.cidade());
            }
            if (data.anofundacao() != null) {
                time.setAnofundacao(data.anofundacao());
            }
            return Optional.of(repository.save(time));
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao alterar dados do professor com id " + id);
        }
    }

    @GetMapping("/{atributo}/{texto}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<TimeResponseDTO> getByAtribuoto(@PathVariable String atributo, @PathVariable String texto){
        switch (atributo.toLowerCase()) {
            case "nome":
                return repository.findByNome(texto).stream().map(TimeResponseDTO::new).toList();
            case "estado":
                return repository.findByEstado(texto).stream().map(TimeResponseDTO::new).toList();
            case "cidade":
                return repository.findByCidade(texto).stream().map(TimeResponseDTO::new).toList();
            case "anofundacao":
                return repository.findByAnofundacao(Integer.parseInt(texto)).stream().map(TimeResponseDTO::new).toList();
        }
        return null;
    }

}

