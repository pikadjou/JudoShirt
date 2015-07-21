<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('New Categories Design'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Categories'), ['controller' => 'Categories', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Category'), ['controller' => 'Categories', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Designs'), ['controller' => 'Designs', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Design'), ['controller' => 'Designs', 'action' => 'add']) ?></li>
    </ul>
</div>
<div class="categoriesDesigns index large-10 medium-9 columns">
    <table cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th><?= $this->Paginator->sort('id') ?></th>
            <th><?= $this->Paginator->sort('category_id') ?></th>
            <th><?= $this->Paginator->sort('design_id') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($categoriesDesigns as $categoriesDesign): ?>
        <tr>
            <td><?= $this->Number->format($categoriesDesign->id) ?></td>
            <td>
                <?= $categoriesDesign->has('category') ? $this->Html->link($categoriesDesign->category->name, ['controller' => 'Categories', 'action' => 'view', $categoriesDesign->category->id]) : '' ?>
            </td>
            <td>
                <?= $categoriesDesign->has('design') ? $this->Html->link($categoriesDesign->design->name, ['controller' => 'Designs', 'action' => 'view', $categoriesDesign->design->id]) : '' ?>
            </td>
            <td class="actions">
                <?= $this->Html->link(__('View'), ['action' => 'view', $categoriesDesign->id]) ?>
                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $categoriesDesign->id]) ?>
                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $categoriesDesign->id], ['confirm' => __('Are you sure you want to delete # {0}?', $categoriesDesign->id)]) ?>
            </td>
        </tr>

    <?php endforeach; ?>
    </tbody>
    </table>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
        </ul>
        <p><?= $this->Paginator->counter() ?></p>
    </div>
</div>
