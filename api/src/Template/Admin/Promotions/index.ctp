<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('New Promotion'), ['action' => 'add']) ?></li>
    </ul>
</div>
<div class="promotions index large-10 medium-9 columns">
    <table cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th><?= $this->Paginator->sort('id') ?></th>
            <th><?= $this->Paginator->sort('name') ?></th>
            <th><?= $this->Paginator->sort('image') ?></th>
            <th><?= $this->Paginator->sort('startDate') ?></th>
            <th><?= $this->Paginator->sort('endDate') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($promotions as $promotion): ?>
        <tr>
            <td><?= $this->Number->format($promotion->id) ?></td>
            <td><?= h($promotion->name) ?></td>
            <td><?= h($promotion->image) ?></td>
            <td><?= h($promotion->startDate) ?></td>
            <td><?= h($promotion->endDate) ?></td>
            <td class="actions">
                <?= $this->Html->link(__('View'), ['action' => 'view', $promotion->id]) ?>
                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $promotion->id]) ?>
                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $promotion->id], ['confirm' => __('Are you sure you want to delete # {0}?', $promotion->id)]) ?>
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
