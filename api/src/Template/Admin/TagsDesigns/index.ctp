<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('New Tags Design'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Tags'), ['controller' => 'Tags', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Tag'), ['controller' => 'Tags', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Designs'), ['controller' => 'Designs', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Design'), ['controller' => 'Designs', 'action' => 'add']) ?></li>
    </ul>
</div>
<div class="tagsDesigns index large-10 medium-9 columns">
    <table cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th><?= $this->Paginator->sort('id') ?></th>
            <th><?= $this->Paginator->sort('tag_id') ?></th>
            <th><?= $this->Paginator->sort('design_id') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($tagsDesigns as $tagsDesign): ?>
        <tr>
            <td><?= $this->Number->format($tagsDesign->id) ?></td>
            <td>
                <?= $tagsDesign->has('tag') ? $this->Html->link($tagsDesign->tag->name, ['controller' => 'Tags', 'action' => 'view', $tagsDesign->tag->id]) : '' ?>
            </td>
            <td>
                <?= $tagsDesign->has('design') ? $this->Html->link($tagsDesign->design->name, ['controller' => 'Designs', 'action' => 'view', $tagsDesign->design->id]) : '' ?>
            </td>
            <td class="actions">
                <?= $this->Html->link(__('View'), ['action' => 'view', $tagsDesign->id]) ?>
                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $tagsDesign->id]) ?>
                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $tagsDesign->id], ['confirm' => __('Are you sure you want to delete # {0}?', $tagsDesign->id)]) ?>
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
