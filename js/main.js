// 打开购票模态框
function openBuyModal() {
    const modal = new bootstrap.Modal(document.getElementById('buyModal'));
    modal.show();
}

// 处理购票提交（票价已改为399）
document.getElementById('buyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const num = document.getElementById('ticketNum').value;
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const price = 399; // 核心修改：票价从3280改为399
    const total = price * num;

    // 生成订单
    const order = {
        id: Date.now(),
        type: '华中“娃”偶doll only',
        num: num,
        name: name,
        phone: phone,
        price: price,
        total: total,
        time: new Date().toLocaleString()
    };

    // 本地存储订单（刷新不丢失）
    const orders = JSON.parse(localStorage.getItem('hzDollOnlyOrders')) || [];
    orders.push(order);
    localStorage.setItem('hzDollOnlyOrders', JSON.stringify(orders));

    // 关闭模态框并刷新订单
    bootstrap.Modal.getInstance(document.getElementById('buyModal')).hide();
    renderOrders();
    alert(`购票成功！订单总价：¥${total}（${num}张×¥399/张）`);
});

// 渲染订单列表
function renderOrders() {
    const orders = JSON.parse(localStorage.getItem('hzDollOnlyOrders')) || [];
    const orderList = document.getElementById('orderList');
    const noOrder = document.getElementById('noOrder');

    if (orders.length === 0) {
        noOrder.style.display = 'block';
        orderList.innerHTML = '';
        return;
    }

    noOrder.style.display = 'none';
    orderList.innerHTML = '';
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'col-12 mb-3 card p-3 shadow-sm';
        orderItem.innerHTML = `
            <div class="d-flex justify-content-between">
                <h6 class="fw-bold">${order.type} - 两日通票</h6>
                <span class="text-primary">¥${order.total}</span>
            </div>
            <p class="text-sm text-muted">数量：${order.num}张 | 单价：¥399 | 联系人：${order.name} | 电话：${order.phone}</p>
            <p class="text-xs text-muted">下单时间：${order.time}</p>
        `;
        orderList.appendChild(orderItem);
    });
}

// 页面加载时渲染订单
window.onload = renderOrders;
