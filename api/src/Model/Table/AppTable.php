<?php
namespace App\Model\Table;


class AppTable extends Table
{
    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        foreach($model->schema()->columns() as $column){
            $validator
                ->allowEmpty($column);
        }
    }
}
