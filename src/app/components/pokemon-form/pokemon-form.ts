import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Favorite } from '../../interfaces/favorite';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-form.html',
  styleUrl: './pokemon-form.scss'
})
export class PokemonForm implements OnInit {

  @Input()
  favorite!: Favorite;

  @Output()
  save = new EventEmitter<Favorite>();

  @Output()
  delete = new EventEmitter<string>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      note: [this.favorite.note,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ]
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;

    }

    this.save.emit({
      ...this.favorite,
      note: this.form.value.note

    });
  }

  eliminar() {
    this.delete.emit(this.favorite.id!);
  }

}