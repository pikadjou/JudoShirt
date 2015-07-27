<?php
namespace App\Model\Table;

use App\Model\Entity\Design;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Designs Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Categories
 * @property \Cake\ORM\Association\BelongsToMany $Tags
 */
class DesignsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('designs');
        $this->displayField('name');
        $this->primaryKey('id');
        $this->belongsToMany('Categories', [
            'foreignKey' => 'design_id',
            'targetForeignKey' => 'category_id',
            'joinTable' => 'categories_designs'
        ]);
        $this->belongsToMany('Tags', [
            'foreignKey' => 'design_id',
            'targetForeignKey' => 'tag_id',
            'joinTable' => 'tags_designs'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->add('id', 'valid', ['rule' => 'numeric'])
            ->allowEmpty('id', 'create');
            
        $validator
            ->allowEmpty('name');
            
        $validator
            ->allowEmpty('content');
            
        $validator
            ->allowEmpty('thumbnail');
            
        $validator
            ->allowEmpty('header');
            
        $validator
            ->allowEmpty('idShop');
            
        $validator
            ->allowEmpty('idCustomShop');

        return $validator;
    }
    
    
    /**
     * Default get all design by category id.
     *
     * @param integer $id (optional)
     * @return App\Model\Table\DesignsTable
     */
    public function getAllById($catId = null)
    {
        $designs = $this->find('all')
                                ->contain([
                                    'Tags', 
                                    'Categories'
                                ]);

        if($catId !== null){
            $designs->matching('Categories', function(\Cake\ORM\Query $q) use ($catId) {
                return $q->where([
                    'Categories.id' => $catId
                ]);
            });
        }
        
        return $designs;
    }
}
