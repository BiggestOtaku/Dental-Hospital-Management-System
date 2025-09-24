package com.dbms.grp2.controller;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.model.Patient;
import com.dbms.grp2.service.patientService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
public class WebController {

    private final patientService patientService;

    public WebController(patientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("patient", new PatientCreateDto());
        return "register";
    }

    @PostMapping("/register")
    public String registerPatient(@Valid @ModelAttribute("patient") PatientCreateDto dto,
                                  BindingResult result,
                                  Model model) {
        if (result.hasErrors()) {
            return "register";
        }
        try {
            patientService.createPatient(dto);
            model.addAttribute("successMessage", "Registration successful! Please login.");
            return "login";
        } catch (Exception e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "register";
        }
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @PostMapping("/login")
    public String loginUser(@RequestParam String email,
                            @RequestParam String password,
                            Model model,
                            RedirectAttributes redirectAttributes) {

        Optional<Patient> optionalPatient = patientService.findByEmail(email);

        if (optionalPatient.isPresent() && optionalPatient.get().getPassword().equals(password)) {
            // Successful login → redirect to home with message
            redirectAttributes.addFlashAttribute("loginMessage", "Successful login!");
            return "redirect:/home";
        } else {
            // Failed login → stay on login page with error message
            model.addAttribute("errorMessage", "Invalid email or password");
            return "login";
        }
    }


    @GetMapping({"/", "/home"})
    public String homePage() {
        return "home";
    }
}
