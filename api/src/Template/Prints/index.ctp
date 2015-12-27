<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('New Design'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Categories'), ['controller' => 'Categories', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Category'), ['controller' => 'Categories', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Tags'), ['controller' => 'Tags', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Tag'), ['controller' => 'Tags', 'action' => 'add']) ?></li>
    </ul>
</div>
<div class="designs index large-10 medium-9 columns">
    <table cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th><?= $this->Paginator->sort('id') ?></th>
            <th><?= $this->Paginator->sort('name') ?></th>
            <th><?= $this->Paginator->sort('thumbnail') ?></th>
            <th><?= $this->Paginator->sort('header') ?></th>
            <th><?= $this->Paginator->sort('shopId') ?></th>
            <th><?= $this->Paginator->sort('idCustomShop') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($designs as $design): ?>
        <tr>
            <td><?= $this->Number->format($design->id) ?></td>
            <td><?= h($design->name) ?></td>
            <td><?= h($design->thumbnail) ?></td>
            <td><?= h($design->header) ?></td>
            <td><?= h($design->shopId) ?></td>
            <td><?= h($design->idCustomShop) ?></td>
            <td class="actions">
                <?= $this->Html->link(__('View'), ['action' => 'view', $design->id]) ?>
                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $design->id]) ?>
                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $design->id], ['confirm' => __('Are you sure you want to delete # {0}?', $design->id)]) ?>
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
