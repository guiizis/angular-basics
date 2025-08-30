import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

type Child = { id: string; label: string };
type ParentGroup = { id: string; label: string; children: Child[] };
type ChildControls = Record<string, FormControl<boolean>>;

@Component({
  selector: 'app-checkbox-test',
  templateUrl: './checkbox-test.component.html',
  styleUrls: ['./checkbox-test.component.scss'],
})
export class CheckboxTestComponent implements OnInit {
  subscriptionsList: Subscription[] = [];
  parents: ParentGroup[] = [
    { id: 'p1', label: 'Pai 1', children: [{ id: 'c1', label: 'Filho 1' }, { id: 'c2', label: 'Filho 2' }] },
    { id: 'p2', label: 'Pai 2', children: [{ id: 'c3', label: 'Filho 3' }, { id: 'c4', label: 'Filho 4' }, { id: 'c5', label: 'Filho 5' }] },
  ];

  formsByParent: Record<string, FormGroup<{
    parent: FormControl<boolean>;
    children: FormGroup<ChildControls>;
  }>> = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    for (const pg of this.parents) {
      const childrenControls = Object.fromEntries(
        pg.children.map(ch => [ch.id, this.fb.nonNullable.control(false)])
      ) as ChildControls;

      this.formsByParent[pg.id] = this.fb.nonNullable.group({
        parent: this.fb.nonNullable.control(false),
        children: this.fb.nonNullable.group(childrenControls),
      });

      this.childrenListenersChanges(pg.id);
    }
  }

  childrenListenersChanges(parentId: string) {
    const checkboxGroup = this.formsByParent[parentId];
    const parentCtrl = checkboxGroup.controls.parent;
    const childrenGroup = checkboxGroup.controls.children;

    const subscriptionParent = parentCtrl.valueChanges.subscribe(parentValue => {
      const vals = Object.values(childrenGroup.getRawValue());
      const isSomeChecked = vals.some(Boolean);

      if (!parentValue) {
        parentCtrl.setValue(isSomeChecked, { emitEvent: false });
      }
    });

    const subscriptionChildren = childrenGroup.valueChanges.subscribe(() => {
      const vals = Object.values(childrenGroup.getRawValue());
      const isSomeChecked = vals.some(Boolean);
      parentCtrl.setValue(isSomeChecked, { emitEvent: false });
    });

    this.subscriptionsList.push(subscriptionParent, subscriptionChildren);
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(sub => sub.unsubscribe());
  }

}
