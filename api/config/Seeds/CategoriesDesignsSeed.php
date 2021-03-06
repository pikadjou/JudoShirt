<?php
use Migrations\AbstractSeed;

/**
 * CategoriesDesigns seed.
 */
class CategoriesDesignsSeed extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     *
     * @return void
     */
    public function run()
    {
        $data = [];

        $table = $this->table('categories_designs');
        $table->insert($data)->save();
    }
}
