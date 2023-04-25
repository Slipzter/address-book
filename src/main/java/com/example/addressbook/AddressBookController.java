package com.example.addressbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.ToDoubleBiFunction;

@RestController
@CrossOrigin(origins = "http://localhost:8080/")
@RequestMapping("/api/address-book")
public class AddressBookController {

    private final AtomicLong counter = new AtomicLong();

    private List<AddressBook> addressBook = new ArrayList<>();

    // Returns all contacts from List
    @GetMapping
    public List<AddressBook> getAllContacts() {
        return addressBook;
    }

    // Returns a specific contact based on id
    @GetMapping("/{id}")
    public AddressBook getContact(@PathVariable long id) {
        AddressBook contact = addressBook.get((int) id);
        if (contact == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return contact;
    }

    //
    @PostMapping
    public void createNewContact(String name, String address) {
        AddressBook contact = new AddressBook(counter.incrementAndGet(), name, address);
        addressBook.add(contact);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        AddressBook contact = addressBook.remove((int) id);
        if (contact == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    // TODO PutMapping
//    @PutMapping("/{id}")
//    public AddressBook updateContact(@PathVariable Long id, @RequestBody AddressBook contact) {
//        contact.setId(id);
//        return addressBook.save(contact);
//    }

}
