package api20.api20.controller;

import api20.api20.empregado.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empregados")
public class EmpregadoController {

    @Autowired
    private EmpregadoRepo repository;

    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public void saveEmpregado(@RequestBody EmpregadoRequestDTO data){
        repository.save(new Empregado(data));
    }

    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<EmpregadoResponseDTO> getAll(){
        return repository.findAll().stream().map(EmpregadoResponseDTO::new).toList();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Optional<Empregado> getById(@PathVariable Long id) {
        return repository.findById(id);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public void deleteById(@PathVariable Long id){
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Optional<Empregado> putById(@PathVariable Long id, @RequestBody EmpregadoRequestDTO data) {
        Optional<Empregado> optionalEmpregado = repository.findById(id);
        if (optionalEmpregado.isPresent()) {
            Empregado empregado = optionalEmpregado.get();
            if (data.nome() != null) {
                empregado.setNome(data.nome());
            }
            if (data.cargo() != null) {
                empregado.setCargo(data.cargo());
            }
            if (data.salario() != null) {
                empregado.setSalario(data.salario());
            }
            return Optional.of(repository.save(empregado));
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao alterar dados do empregado com id " + id);
        }
    }

    @GetMapping("/{atributo}/{texto}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<EmpregadoResponseDTO> getByAtribuoto(@PathVariable String atributo, @PathVariable String texto){
        switch (atributo.toLowerCase()) {
            case "nome":
                return repository.findByNome(texto).stream().map(EmpregadoResponseDTO::new).toList();
            case "cargo":
                return repository.findByCargo(texto).stream().map(EmpregadoResponseDTO::new).toList();
            case "salario":
                return repository.findBySalario(Integer.parseInt(texto)).stream().map(EmpregadoResponseDTO::new).toList();
        }
        return null;
    }

}

