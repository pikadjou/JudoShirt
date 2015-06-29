<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit Categories Design'), ['action' => 'edit', $categoriesDesign->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Categories Design'), ['action' => 'delete', $categoriesDesign->id], ['confirm' => __('Are you sure you want to delete # {0}?', $categoriesDesign->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Categories Designs'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Categories Design'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Categories'), ['controller' => 'Categories', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Category'), ['controller' => 'Categories', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Designs'), ['controller' => 'Designs', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Design'), ['controller' => 'Designs', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="categoriesDesigns view large-10 medium-9 columns">
    <h2><?= h($categoriesDesign->id) ?></h2>
    <div class="row">
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($categoriesDesign->id) ?></p>
            <h6 class="subheader"><?= __('CategoriesId') ?></h6>
            <p><?= $this->Number->format($categoriesDesign->categoriesId) ?></p>
            <h6 class="subheader"><?= __('DesignsId') ?></h6>
            <p><?= $this->Number->format($categoriesDesign->designsId) ?></p>
        </div>
    </div>
</div>
