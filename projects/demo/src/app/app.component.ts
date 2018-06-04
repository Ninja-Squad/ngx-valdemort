import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValdemortConfig } from 'ngx-valdemort';

function validCredentials(group: FormGroup) {
  return group.get('password').value === group.get('confirmation').value ? null : { validCredentials: true };
}

interface Person {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form: FormGroup;
  person: Person = {
    name: '',
    address: {
      street: '',
      city: ''
    }
  };
  search: string;
  searchCtrl = new FormControl('', Validators.pattern(/^\d*$/));

  dynamicForm: FormGroup;

  constructor(fb: FormBuilder, config: ValdemortConfig) {
    config.errorsClasses = 'invalid-feedback';
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]*$/)]],
      age: [null, [Validators.required, Validators.min(18)]],
      credentials: fb.group({
        password: ['', Validators.required],
        confirmation: ['', Validators.required]
      }, { validator: validCredentials })
    });

    this.dynamicForm = fb.group({
      occupations: fb.array([
        fb.control('', Validators.required)
      ])
    });
  }

  get occupations(): FormArray {
    return this.dynamicForm.get('occupations') as FormArray;
  }

  submit() {
    if (this.form.valid) {
      console.log('submitting ', this.form.value);
    } else {
      console.log('invalid: not submitting');
    }
  }

  submitPerson() {
  }
}
